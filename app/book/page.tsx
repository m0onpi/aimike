// app/book/page.tsx
import React from 'react';
import Layout from '../layout';
import BookForm from '../../components/BookForm';

export default function BookPage() {
  return (
        <Layout>
        <BookForm />
        </Layout>
  );
}
