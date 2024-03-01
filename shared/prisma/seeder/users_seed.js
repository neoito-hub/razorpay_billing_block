async function addUsers(prisma) {
  await prisma.users.create({
    data: {
      id: 'zCSAYU_t2_aJYqEADBZtD',
      firstName: 'John',
      middleName: 'User',
      lastName: '',
      countryCode: '+1',
      phnNo: '1234567890',
      displayName: 'John Doe',
      displayPicture: 'https://example.com/profile_picture.jpg',
      status: 1,
      isEmailVerified: true,
      createdAt: new Date('2024-02-21 11:24:24.871'),
      updatedAt: new Date('2024-02-21 11:24:24.871'),
    },
  })

  await prisma.admin_users.create({
    data: {
      id: 'zCSAYU_t2_aJYqEADBZtC',
      firstName: 'John',
      middleName: 'ADMIN',
      lastName: 'Smith',
      countryCode: '+1',
      phnNo: '1234567890',
      displayName: 'John Doe',
      displayPicture: 'https://example.com/profile_picture.jpg',
      status: 1,
      isEmailVerified: true,
      createdAt: new Date('2024-02-21 11:23:36.206'),
      updatedAt: new Date('2024-02-21 11:23:36.206'),
    },
  })

  console.log('Data seeded successfully')
}

export default addUsers
