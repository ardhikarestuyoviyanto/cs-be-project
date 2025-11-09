import { Snowflake } from '@skorotkiewicz/snowflake-id';

const snowflake = new Snowflake(1);

export const getId = async (): Promise<bigint> => {
    const idStr = (await snowflake.generate()).toString();
    const idBigInt: bigint = BigInt(idStr);
    return idBigInt;
};
