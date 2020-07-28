class Announcement < ApplicationRecord
    def calculate_score
        votes = AnnouncementsVote.where(announcement_id: id);
        x_score = 0;
        i = 0.0;
        votes.each do |x_vote|
            x_score += x_vote.vote;
            i += 1;
        end
        score = x_score / i;
        self.update_attribute(:score, score)
    end
end
