class AnnouncementsVotesController < ApplicationController
  def create
      announcement_vote = AnnouncementsVote.create!(vote: params[:vote],announcement_id: params[:announcement_id],user_id: session[:user_id])
      if announcement_vote
        render json: announcement_vote
      else
        render json: announcement_vote.errors
      end
      announcement = Announcement.where(id: params[:announcement_id])
      announcement.first.calculate_score
  end
end
