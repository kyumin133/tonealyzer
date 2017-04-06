class AddBlurbTitle < ActiveRecord::Migration[5.0]
  def change
    add_column :blurbs, :title, :string
  end
end
