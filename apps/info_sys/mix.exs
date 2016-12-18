defmodule InfoSys.Mixfile do
  use Mix.Project

  def project do
    [app: :info_sys,
     version: "0.1.0",
     build_path: "../../_build",
     config_path: "../../config/config.exs",
     deps_path: "../../deps",
     lockfile: "../../mix.lock",
     elixir: "~> 1.3",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps]
  end

  def application do
    [applications: [:logger],
     mod: {InfoSys, []}]
  end

  defp deps do
    [
      {:sweet_xml, "~> 0.5.0"}
    ]
  end
end
