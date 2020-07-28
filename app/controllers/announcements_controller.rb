class AnnouncementsController < ApplicationController
  def index
      if (params[:order_by] != "recent")
          announcement = Announcement.all.order(score: :desc)
      else
          announcement = Announcement.all.order(created_at: :desc)
      end
    render json: announcement
  end

  def create
    announcement = Announcement.create!(announcement_params)
    if announcement
      render json: announcement
    else
      render json: announcement.errors
    end
  end

  def show
    if announcement
      render json: announcement
    else
      render json: announcement.errors
    end
  end

  def destroy
    announcement&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  private

  def announcement_params
    params.permit(:title, :content)
  end

  def announcement
    @announcement ||= Announcement.find(params[:id])
  end
end
