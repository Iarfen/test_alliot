class AnnouncementsCommentsController < ApplicationController
  def index
      announcement_comments = AnnouncementsComment.where(announcement_id: params[:id]).order(created_at: :desc)
      render json: announcement_comments
  end

  def create
      announcement_comment = AnnouncementsComment.create!(comment: params[:comment],announcement_id: params[:announcement_id],user_id: session[:user_id])
      if announcement_comment
        render json: announcement_comment
      else
        render json: announcement_comment.errors
      end
  end

  def show
  end

  def destroy
  end

  private

  def announcement_comment_params
    params.permit(:comment)
  end

  def announcement_comment
    @announcement_comment ||= AnnouncementsComment.find(params[:id])
  end
end
