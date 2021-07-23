from django.db import models


class Clientes(models.Model):
    rut = models.CharField(unique=True, max_length=10)
    name = models.CharField(verbose_name='Nombre',max_length=100)

    def __str__(self):
        return f'{self.name}/{self.rut}'


class Empresas(models.Model):
    name = models.CharField(verbose_name='Nombre',max_length=100)

    def __str__(self):
        return self.name


class Arriendos(models.Model):
    id_cliente = models.ForeignKey('api.Clientes', on_delete=models.CASCADE)
    id_empresa = models.ForeignKey('api.Empresas', on_delete=models.CASCADE)
    costo_diario = models.IntegerField(verbose_name='Costo Diario')
    dias = models.IntegerField(verbose_name='Dias')

    def __str__(self):
        return f'{self.id_cliente}/{self.id_empresa}'
