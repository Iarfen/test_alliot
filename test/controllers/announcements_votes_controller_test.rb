require 'test_helper'

class AnnouncementsVotesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get announcements_votes_create_url
    assert_response :success
  end

end
