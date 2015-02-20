class Point < ActiveRecord::Base
  attr_accessor :label
  belongs_to :map
end
