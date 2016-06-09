class Comment < ActiveRecord::Base
  validates :user_id, presence:true, inclusion: {in: Proc.new { User.pluck(:id) }}
  validates :battle_id, presence:true, inclusion: {in: Proc.new { Battle.unwon.pluck(:id) }}

  belongs_to :battle
  belongs_to :comment
  belongs_to :user

  has_many :comments
  has_one :battle_won, class_name: 'Battle', foreign_key: 'winning_comment_id'
  has_many :tags

  def image
    regex = /https?:\/\/\S+\.(?:gifv|webm|mp4|jpg|jpeg|png|gif)/i
    body.match(regex).to_s
  end
end
