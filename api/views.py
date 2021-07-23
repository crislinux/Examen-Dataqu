from operator import itemgetter
from collections import OrderedDict

from django.forms import models
from django.views.generic import TemplateView
from rest_framework import filters, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Clientes, Empresas, Arriendos
from .serializer import ClienteSerializer, EmpresasSerializer, ArriendosSerializer, EmpresasDetailedSerializer


class index(TemplateView):
    template_name = "arriendo/index.html"


class clientes(TemplateView):
    template_name = "arriendo/clientes.html"


class empresas(TemplateView):
    template_name = "arriendo/empresas.html"


class ingreso_cliente(TemplateView):
    template_name = "arriendo/ingreso_data.html"


class ingreso_arriendo(TemplateView):
    template_name = "arriendo/ingreso_data_empresas.html"


class ClientesViewSet(ModelViewSet):
    queryset = Clientes.objects.all()
    serializer_class = ClienteSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name']

    @action(detail=False, methods=['get'])
    def get_client_last_name(self, request):
        clientes = self.queryset
        arriendos = []

        for client in clientes:
            arriendo_cliente = client.arriendos_set.all()
            suma = 0
            for arriendo in arriendo_cliente:
                suma += arriendo.costo_diario
            arriendos.append({'name': client.name, 'suma': suma})
        arriendos_sorted = sorted(arriendos, key=itemgetter('suma'), reverse=True)
        return Response(arriendos_sorted)

    @action(detail=True, methods=['get'])
    def get_client_sort_by_amount(self, request, pk=None):  # /cliente/3/get_client...

        if pk:
            try:
                empresa = Empresas.objects.get(pk=pk)
            except Empresas.DoesNotExist:
                return Response({"error": "no se pudo encontrar la empresa con ese id"},
                                status=status.HTTP_404_NOT_FOUND)
            clients = self.queryset.filter(arriendos__id_empresa=empresa.id)
        else:
            clients = self.queryset
        arriendo_list = []
        suma = 0
        for client in clients:
            sum_arriendos = [arriendo.costo_diario for arriendo in client.arriendos_set.all()]
            suma = sum(sum_arriendos)
            if suma >= 40000:
                arriendo_list.append({client.rut: suma})
        return Response(arriendo_list)

class EmpresasViewSet(ModelViewSet):
    queryset = Empresas.objects.all()
    serializer_class = EmpresasSerializer

    @action(detail=False, methods=['get'])
    def get_ruts_by_client(self, request):
        diccionario = OrderedDict()
        for empresa in self.queryset:
            arriendos = empresa.arriendos_set.all()
            rut = [arriendo.id_cliente.rut for arriendo in arriendos]
            diccionario[empresa.name] = rut

        return Response(diccionario)

    @action(detail=False, methods=['get'])
    def get_company_sort_by_profits(self, request):
        empresas = self.queryset
        lista_empresas = []
        for empresa in empresas:

            arriendos = empresa.arriendos_set.all()
            suma = 0
            for arriendo in arriendos:
                suma += arriendo.costo_diario
            lista_empresas.append(
                {'id': empresa.id, 'name': empresa.name, 'suma': suma}
            )
        lista_sorted = sorted(lista_empresas, key=itemgetter('suma'), reverse=False)
        for items in lista_sorted:
            items.pop('suma')
        return Response(lista_sorted)

    @action(detail=False, methods=['get'])
    def get_company_with_rents_over_1_week(self, request):

        empresas = self.queryset.filter(arriendos__dias__gte=7)  # TODO: VALIDAR resultados repetidos en el queryset.
        # for empresa in empresas:
        #     arriendos = empresa.arriendos_set.all()
        #     clientes = arriendos.filter().values('id_cliente').annotate(n=models.Count('pk'))
        serializer = self.serializer_class(empresas, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_grafico_arriendos(self, request):
        empresas = self.queryset
        lista_empresas = []
        for empresa in empresas:
            arriendos = empresa.arriendos_set.all()
            suma = 0
            for arriendo in arriendos:
                suma += arriendo.costo_diario
            lista_empresas.append(
                {'id': empresa.id, 'name': empresa.name, 'suma': suma}
            )
        lista_sorted = sorted(lista_empresas, key=itemgetter('suma'), reverse=False)

        return Response(lista_sorted)


class ArriendosViewSet(ModelViewSet):
    queryset = Arriendos.objects.all()
    serializer_class = ArriendosSerializer
