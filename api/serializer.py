from rest_framework import serializers
from .models import Clientes, Empresas, Arriendos


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = '__all__'

class EmpresasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresas
        fields = '__all__'

class EmpresasDetailedSerializer(serializers.ModelSerializer):
    rut = serializers.SerializerMethodField()
    class Meta:
        model = Empresas
        exclude = ['id']

    def get_rut(self, obj):
        for empresa in obj:
            arriendos = empresa.arriendos_set.all()
            rut = [arriendo.id_cliente.rut for arriendo in arriendos]
            return rut

class ArriendosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arriendos
        fields = '__all__'
