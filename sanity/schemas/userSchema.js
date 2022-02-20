export const userSchema = {
  name: 'users',
  title: 'Users',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    }, 
    {
      name: 'walletAddress',
      title: 'Wallet Address ',
      type: 'string',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'isProfileImageNft',
      title: 'Is profile image NFT',
      type: 'boolean',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'string',
    },
    {
      name: 'digs',
      title: 'Digs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'digs' }]
        }
      ]
    }
  ]
}