from django.urls import path, include
from rest_framework.routers import DefaultRouter


from .views import ClientesViewSet, EmpresasViewSet, ArriendosViewSet,index,clientes,empresas,ingreso_arriendo,ingreso_cliente
router = DefaultRouter()
router.register(r'clientes', ClientesViewSet)
router.register(r'empresas', EmpresasViewSet)
router.register(r'arriendos', ArriendosViewSet)

urlpatterns = [
	path('', include(router.urls)),
	path('index/', index.as_view(), name="index"),
	path('clientes_home/', clientes.as_view(), name="clientes_home"),
	path('empresas_home/', empresas.as_view(), name="empresas_home"),
	path('ingreso_clientes/', ingreso_cliente.as_view(), name="ingreso_clientes"),
	path('ingreso_empresas/', ingreso_arriendo.as_view(), name="ingreso_empresas"),
]
