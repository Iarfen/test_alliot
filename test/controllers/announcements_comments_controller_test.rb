require 'test_helper'

class AnnouncementsCommentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get announcements_comments_index_url
    assert_response :success
  end

  test "should get create" do
    get announcements_comments_create_url
    assert_response :success
  end

  test "should get show" do
    get announcements_comments_show_url
    assert_response :success
  end

  test "should get destroy" do
    get announcements_comments_destroy_url
    assert_response :success
  end

end
