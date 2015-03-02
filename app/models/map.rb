class Map < ActiveRecord::Base
  attr_accessor :label
  belongs_to :user
  has_many :markers
end
