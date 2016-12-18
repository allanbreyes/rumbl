defmodule Rumbl.TestHelpers do
  alias Rumbl.Repo

  def insert_user(attrs \\ %{}) do
    changes = Dict.merge(%{
      name: "Some User",
      username: "user#{Base.encode16(:crypto.rand_bytes(8))}",
      password: "changeme"
    }, attrs)

    %Rumbl.User{}
    |> Rumbl.User.registration_changeset(changes)
    |> Repo.insert!
  end

  def insert_video(user, attrs \\ %{}) do
    changes = Dict.merge(%{
      title: "Some Video",
    }, attrs)

    user
    |> Ecto.build_assoc(:videos, changes)
    |> Repo.insert!
  end

  def insert_category(attrs \\ %{}) do
    %Rumbl.Category{}
    |> Rumbl.Category.changeset(attrs)
    |> Repo.insert!
  end
end
