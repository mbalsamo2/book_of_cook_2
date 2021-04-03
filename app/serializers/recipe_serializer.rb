class RecipeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :ingredients, :instruction, :created_at,
             :updated_at, :user_id, :copy, :public, :image, :username
  belongs_to :user

  def username
    object.user.username
  end

end
