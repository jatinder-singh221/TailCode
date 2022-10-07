from django.apps import AppConfig


class AuthenciationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'authenciation'

    def ready(self) -> None:
        import authenciation.signals
