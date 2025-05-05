import { CarbonIntensityRecord } from "../types/carbonIntensityRecord";
import { UserWithPassword } from "../types/userWithPassword";
import databaseUtils from "../utils/databaseUtils";

const utils = new databaseUtils();

test('Test getCarbonIntensityRecordsCount', async () => {
    const recordNumber = await utils.getCarbonIntensityRecordsCount();
    expect(recordNumber > 0);
});

test('Test getAllCarbonIntensityRecords', async () => {
    const records = await utils.getAllCarbonIntensityRecords()
    expect(records.length > 0);
});

test('Test getCarbonIntensityRecordById', async () => {
    const record = await utils.getCarbonIntensityRecordById(1);
    expect(record.id === 1 && record.from !== null && record.from !== "");
});

test('Test insertCarbonIntensityRecord', async () => {
    const record: CarbonIntensityRecord = {
        id:0,
        from: "2018-01-20T17:00Z",
        to: "2018-01-20T17:02Z",
        intensity_forecast: 270,
        intensity_actual: 260,
        index: "low",
        gas: 35.6,
        coal: 12.7,
        biomass: 5.2,
        nuclear: 14.6,
        hydro: 3.1,
        imports: 11.5,
        wind: 12.8,
        solar: 19.1,
        other: 2.4,
        total:114.0
    }
    const oldCount = await utils.getCarbonIntensityRecordsCount();
    await utils.insertCarbonIntensityRecord(record);
    const count = await utils.getCarbonIntensityRecordsCount();
    expect(count > oldCount);
});

test('Test insertCarbonIntensityRecord', async () => {
    const oldCount = await utils.getCarbonIntensityRecordsCount();
    await utils.deleteCarbonIntensityRecordById(oldCount)
    const count = await utils.getCarbonIntensityRecordsCount();
    expect(count < oldCount);
});

test('Test getUsers', async () => {
    const users = await utils.getUsers();
    expect(users.length > 0);
});

test('Test insertUser', async () => {
    const oldUsers = await utils.getUsers();
    const user:UserWithPassword = {
        id:0,
        user:"test",
        password:"try"
    };
    await utils.insertUser(user);
    const newUsers = await utils.getUsers();
    expect(newUsers.length > oldUsers.length);
});

test('Test deleteUser', async () => {
    const oldUsers = await utils.getUsers();
    await utils.deleteUser(oldUsers.length);
    const newUsers = await utils.getUsers();
    expect(newUsers.length < oldUsers.length);
});

test('Test checkUser', async () => {
    const result = await utils.checkUser("user", "try");
    expect(result);
})

test('Test checkUser with wrong credentials', async () => {
    const result = await utils.checkUser("user", "try");
    expect(!result);
})