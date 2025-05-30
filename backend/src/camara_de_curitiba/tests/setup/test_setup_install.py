import pytest
from camara_de_curitiba import PACKAGE_NAME


class TestSetupInstall:
    def test_addon_installed(self, installer):
        """Test if camara_de_curitiba is installed."""
        assert installer.is_product_installed(PACKAGE_NAME) is True

    def test_browserlayer(self, browser_layers):
        """Test that ICamaraDeCuritibaLayer is registered."""
        from camara_de_curitiba.interfaces import ICamaraDeCuritibaLayer

        assert ICamaraDeCuritibaLayer in browser_layers

    def test_latest_version(self, profile_last_version):
        """Test latest version of default profile."""
        assert profile_last_version(f"{PACKAGE_NAME}:default") == "20250121001"

    @pytest.mark.parametrize(
        "package",
        [
            "pas.plugins.oidc",
        ]
    )
    def test_dependency_installed(self, installer, package):
        """Test if dependency is installed."""
        assert installer.is_product_installed(package) is True