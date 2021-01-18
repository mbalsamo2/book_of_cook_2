# class UpdateRecipeService
  # def initialize(recipe, params)
  #   @recipe = recipe
  #   @params = params
  # end
  #
  # def call
  #   binding.pry
  #   if @params[:image] && !file?(@params[:image])
  #     delete_image if @recipe.image.attached?
  #     @params.delete(:image)
  #   end
  #
  #   @recipe.update(@params)
  # end
  #
  # private
  #
  # def file?(param)
  #   param.is_a?(ActionDispatch::Http::UploadedFile)
  # end
  #
  # def delete_image
  #   @recipe.image.purge
  # end
# end
