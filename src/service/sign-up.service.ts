import { Company, Users } from '../types/model.types';
import { prisma } from '../config/db';
import verb from '../../locales/id/verb.json';
import { getId } from '../helper/generate-id.helper';
import { YesNo } from '../generated/prisma';

export class SignUpService {
    async signUp(user: Users, company: Company): Promise<any> {
        const userEmail = await prisma.users.findFirst({
            where: { email: user.email, deletedAt: null },
        });

        if (userEmail != null) {
            // email already exists
            return {
                success: false,
                errors: {
                    'user.email': verb.emailExists,
                },
            };
        }

        const companyPhoneNumber = await prisma.company.findFirst({
            where: { phoneNumber: company.phoneNumber, deletedAt: null },
        });

        if (companyPhoneNumber != null) {
            // phone number already exists
            return {
                success: false,
                errors: {
                    'company.phoneNumber': verb.phoneNumberExists,
                },
            };
        }

        await prisma.$transaction(async (prisma) => {
            const companyRes = await prisma.company.create({
                data: {
                    id: await getId(),
                    name: company.name,
                    address: company.address,
                    email: company.email,
                    phoneNumber: company.phoneNumber,
                },
            });

            const userRes = await prisma.users.create({
                data: {
                    id: await getId(),
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    isActive: YesNo.yes,
                    isAdmin: YesNo.yes,
                },
            });

            await prisma.userCompany.create({
                data: {
                    id: await getId(),
                    userId: userRes.id,
                    companyId: companyRes.id,
                },
            });

            const idRoleAdmin = await getId();
            await prisma.role.createMany({
                data: [
                    {
                        id: idRoleAdmin,
                        companyId: companyRes.id,
                        name: 'ADMIN',
                    },
                    {
                        id: await getId(),
                        companyId: companyRes.id,
                        name: 'CUSTOMER SERVICE',
                    },
                ],
            });

            // asign to user role
            await prisma.userRole.create({
                data: {
                    id: await getId(),
                    userId: userRes.id,
                    roleId: idRoleAdmin,
                },
            });
        });

        return {
            success: true,
            data: null,
        };
    }
}
