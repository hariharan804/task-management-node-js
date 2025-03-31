// import { Logger } from '@helpers';
// import { BusinessEntity } from '@models';

// // Create Vendor (Optimized)
// export const createVendor = async (options) => {
//   console.time('CreateVendor');
//   try {
//     const result = await BusinessEntity.query(options.Tenant)
//       .upsertGraph({ ...options }, { relate: true })
//       .returning('*');

//     console.timeEnd('CreateVendor');
//     return result;
//   } catch (error) {
//     Logger.error(error.message, error);
//     throw new Error('Failed to create vendor');
//   }
// };

// // Soft Delete Vendor (Optimized)
// export const deleteVendor = async ({ Tenant, id }) => {
//   if (!id) throw new Error('Id is mandatory!');

//   console.time('DeleteVendor');
//   const result = await BusinessEntity.query(Tenant)
//     .update({ is_deleted: true })
//     .where('id', id);

//   console.timeEnd('DeleteVendor');
//   return result;
// };

// // Find All Vendors (Optimized Query)
// export const findAllVendors = async ({
//   search = '',
//   offset = 0,
//   limit = 10,
//   sortBy = 'updated_at',
//   Tenant,
//   clientId,
//   organizationId,
//   isActive,
// }) => {
//   console.time('FindAllVendors');
//   try {
//     const baseQuery = BusinessEntity.query(Tenant)
//       .alias('entity')
//       .select('entity.*')
//       .where({
//         is_deleted: false,
//         client_id: clientId,
//         organization_id: organizationId,
//       })
//       .modify((builder) => {
//         if (search) {
//           builder
//             .where('entity.name', 'ilike', `%${search}%`)
//             .orWhere('entity.name_arabic', 'ilike', `%${search}%`);
//         }
//         if (isActive !== undefined) {
//           builder.where('entity.is_active', isActive);
//         }
//       })
//       .orderBy(sortBy, 'desc')
//       .limit(limit)
//       .offset(offset);

//     const [GetVendorResult, totalCount] = await Promise.all([
//       baseQuery,
//       BusinessEntity.query(Tenant).resultSize(),
//     ]);

//     console.timeEnd('FindAllVendors');
//     return { GetVendorResult, totalCount };
//   } catch (error) {
//     Logger.error(error.message, error);
//     throw new Error('Failed to fetch vendors');
//   }
// };
