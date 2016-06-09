class Battle < ActiveRecord::Base
  validates :topic, presence:true
  validates :created_by_id, presence:true, inclusion: {in: Proc.new { User.pluck(:id) }}
  validate :must_be_previous_winner, on: :new
  belongs_to :created_by, class_name:'User'
  belongs_to :winning_comment, class_name: 'Comment'
  has_one :winning_user, through: :winning_comment, source: :user
  has_many :participating_users, -> { distinct }, through: :comments, source: :user

  has_many :comments

  scope :unwon, -> { where(winning_comment_id: nil) }
  scope :won, -> { where.not(winning_comment_id: nil) }

  def must_be_previous_winner
    User.current_winner.id == self.created_by_id
  end

  def won?
    !winning_comment.nil?
  end

  def self.current
    find_by(winning_comment_id: nil)
  end
end
