select p.key from  group_permissions gp
inner join permissions p on p.id = gp.permission_id 
where gp.group_id = 1;

