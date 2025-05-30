from camara_de_curitiba import PACKAGE_NAME

import pytest


class TestSetupUninstall:
    @pytest.fixture(autouse=True)
    def uninstalled(self, installer):
        installer.uninstall_product(PACKAGE_NAME)
        installer.uninstall_product('pas.plugins.oidc')

    def test_product_uninstalled(self, installer):
        """Test if camara_de_curitiba is cleanly uninstalled."""
        assert installer.is_product_installed(PACKAGE_NAME) is False

    def test_browserlayer_removed(self, browser_layers):
        """Test that ICaseStudyLayer is removed."""
        from camara_de_curitiba.interfaces import ICamaraDeCuritibaLayer

        assert ICamaraDeCuritibaLayer not in browser_layers

    @pytest.mark.parametrize(
        "package",
        [
            "pas.plugins.oidc",
        ]
    )
    def test_dependency_uninstalled(self, installer, package):
        """Test if dependency is installed."""
        assert installer.is_product_installed(package) is False