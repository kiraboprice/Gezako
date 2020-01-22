
export const DEVELOPMENT_PHASE = 'development';
export const COMPLETED_PHASE = 'completed';

/**
 * Follow this order when creating/updating a report
 *  - added from UI when creating new report:
 * title
 * phase
 * service
 * type
 * fileDownLoadUrl
 * assignedTo
 * numberOfTests
 * productSpec
 * techSpec
 *
 * - added by action when creating new report:
 * createdBy
 * userId
 * status
 * createdAt
 * updatedAt
 */
