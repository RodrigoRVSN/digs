export const digsSchema = {
  name: 'digs',
  title: 'Digs',
  type: 'document',
  fields: [
    {
      name: 'digs',
      title: 'Digs',
      type: 'string',
    }, 
    {
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'users'}]
    }
  ]
}