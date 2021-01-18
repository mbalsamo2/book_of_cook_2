class RecipeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :ingredients, :instruction, :created_at,
             :updated_at, :user_id, :copy, :public, :image

  # def updated_at
  #   object.updated_at.to_date
  # end
  #
  # def created_at
  #   object.updated_at.to_date
  # end
  #
  # def image
  #   binding.pry
  #   return unless object.image.attached?
  #
  #   object.image.blob.attributes
  #     .slice('filename', 'byte_size')
  #     .merge(url: image_url)
  #     .tap { |attrs| attrs['name'] = attrs.delete('filename') }
  # end
  #
  # def image_url
  #   if object.image
  #     url_for(object.image)
  #   end
  # end

end
