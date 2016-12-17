defmodule Rumbl.CategoryRepoTest do
  use Rumbl.ModelCase
  alias Rumbl.Category

  test "alphabetical/1 orders by name" do
    insert_category %{name: "a"}
    insert_category %{name: "b"}
    insert_category %{name: "c"}

    query = Category |> Category.alphabetical
    query = from c in query, select: c.name
    assert Repo.all(query) == ~w(a b c)
  end
end
