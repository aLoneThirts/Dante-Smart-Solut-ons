// pages/news/[id].js
import React from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import Link from 'next/link'
import data from '../../data/siteContent.json'

export async function getServerSideProps({ params }) {
  const item = data.news.find((n) => String(n.id) === params.id)
  if (!item) {
    return { notFound: true }
  }
  return { props: { item } }
}

export default function NewsDetail({ item }) {
  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        {item.img && <Card.Img variant="top" src={item.img} />}
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.excerpt}</Card.Text>
          <Link href="/news" passHref>
            <Button variant="outline-secondary">Geri</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  )
}
