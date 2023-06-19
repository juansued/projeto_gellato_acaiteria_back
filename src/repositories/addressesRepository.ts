import { addresses, Prisma, users } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';
import { UpdateAddressData, UpdateUserData, UsersBasic } from '@/interfaces/userInterfaces ';

//=================== GET =====================//

function getAddressesByUser(id: number): Promise<addresses[]> {
  const params: Prisma.addressesFindManyArgs = {
    where: {
      userId: id,
    },
  };

  return prisma.addresses.findMany(params);
}
function getAddressById(id: number): Promise<addresses> {
  const params: Prisma.addressesFindUniqueArgs = {
    where: {
      id,
    },
  };

  return prisma.addresses.findUnique(params);
}

//================= INSERT ===================//

async function insertAddress(newAddress: Omit<addresses, 'id' | 'createdAt' | 'updatedAt'>) {
  return await prisma.addresses.create({
    data: {
      street: newAddress.street,
      number: newAddress.number,
      city: newAddress.city,
      state: newAddress.state,
      neighborhood: newAddress.neighborhood,
      cep: newAddress.cep,
      user: {
        connect: { id: newAddress.userId },
      },
    },
  });
}

//================= UPDATE ===================//

async function updateAddress(id: number, updateAddressData: UpdateAddressData) {
  const params: Prisma.addressesUpdateArgs = {
    where: { id },
    data: updateAddressData,
  };

  await prisma.addresses.update(params);
}

async function deleteUser(id: number) {
  await prisma.users.delete({ where: { id: id } });
}

export { insertAddress, getAddressById, updateAddress, getAddressesByUser };
