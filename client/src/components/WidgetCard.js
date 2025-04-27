import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../redux/widgetSlice';
import { Button, Card } from 'react-bootstrap';

const WidgetCard = ({ categoryId, widget }) => {
  const dispatch = useDispatch();

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          {widget.title}
          <Button
            variant="danger"
            size="sm"
            className="float-end"
            onClick={() => dispatch(removeWidget({ categoryId, widgetId: widget.id }))}
          >
            ✕
          </Button>
        </Card.Title>
        <Card.Text>{widget.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WidgetCard;