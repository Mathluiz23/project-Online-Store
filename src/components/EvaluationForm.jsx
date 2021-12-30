import React, { useState } from 'react';

function EvaluationForm() {
    const [comment, setComment] = useState('');
    const [email, setEmail] = useState('');

    return (
      <div>
        <h2>Avaliações</h2>
        <form>
          <div>
            <input
              id="email"
              type="text"
              value={email}
              placeholder="Email"
            />
          </div>

          <textarea
            id="comment"
            value={comment}
            placeholder="Comentários"
          />

          <button type="submit">Avaliar</button>
        </form>
      </div>
    );
  }

export default EvaluationForm;
