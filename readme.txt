Why not service layer:
Anti-pattern as it just wraps around the dao.
Assignment 2 uses a similar service-layer.

Use of spring data for database access


Why isn't Category just a field in Room?
Category has one field in addition to it's ID, and it is also one-to-one relationship.
With other words it could just be a extra field in Room (private String Category);