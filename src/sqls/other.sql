select b.*,bc.organization_id from books b 
inner join book_copies bc on b.book_id = bc.book_id 
where b.book_id = 5 and bc.organization_id = 101;