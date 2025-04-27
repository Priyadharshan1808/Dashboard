import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Container, Form } from 'react-bootstrap';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { categories = [] } = useSelector((state) => state.widget || {});

  const filteredWidgets = categories
    ?.flatMap((category) =>
      category.widgets.map((widget) => ({
        ...widget,
        category: category.name,
      }))
    )
    .filter(
      (widget) =>
        widget.name &&
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Container className="my-4">
      <Form.Control
        type="text"
        placeholder="Search Widgets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && filteredWidgets.map((widget, idx) => (
        <Card key={idx} className="mt-2">
          <Card.Body>
            <Card.Title>{widget.name}</Card.Title> {/* ✅ Corrected */}
            <Card.Text>{widget.text}</Card.Text>   {/* ✅ Corrected */}
            <Card.Footer className="text-muted">Category: {widget.category}</Card.Footer>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default SearchBar;
