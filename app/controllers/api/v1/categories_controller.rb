class Api::V1::CategoriesController < Api::V1::ApiController
  before_action :set_category, only: [:show, :update, :destroy]

  def index
    @categories = Category.all
    render json: @categories, status: :ok
  end

  def show
    render json: @category, status: :ok
  end

  def create
    @parent = ParentCategory.find_by(id: category_params[:parent_category_id])
    @category = @parent.categories.new(category_params)

    if @category.save
      render json: @category, status: :created
    else
      render json: {
                      errors: @category.try(:errors),
                      messages: @category.try(:errors).try(:full_messages)
                    },
             status: :unprocessable_entity
    end
  end

  def update
    if @category.update(category_params)
      render json: @category, status: :ok
    else
      render json: {
                      errors: @category.try(:errors),
                      messages: @category.try(:errors).try(:full_messages)
                    },
             status: :unprocessable_entity
    end
  end

  def destroy
    @category.destroy
    render json: true, status: :ok
  end

  private
    def set_category
      @category = Category.find_by(id: params[:id])
    end

    def category_params
      params.fetch(:category, {}).permit(:name, :description, :parent_category_id)
    end
end
