import { dataGenerator } from './dataGenerator';
import { apiCall } from './api';
import { config } from './config';

jest.mock('./api');

describe('dataGenerator', () => {
    afterEach(() => {
        apiCall.mockReset();
    });

    it('should return object with name and status when name is string and apiCall returns true', async () => {
        // having
        const name = 'Bruce';
        apiCall.mockResolvedValue(true);

        // when
        const result = await dataGenerator(name);

        // then
        expect(apiCall).toHaveBeenCalledWith(config.url, name);
        expect(result).toEqual({ name, status: true });
    });

    it('should return object with name and status when name is string and apiCall returns false', async () => {
        // having
        const name = 'Bruce';
        apiCall.mockResolvedValue(false);

        // when
        const result = await dataGenerator(name);

        // then
        expect(apiCall).toHaveBeenCalledWith(config.url, name);
        expect(result).toEqual({ status: false });
    });

    it('should return object with name and status when name is function and apiCall returns true', async () => {
        // having
        const name = () => 'Lee';
        apiCall.mockResolvedValue(true);

        // when
        const result = await dataGenerator(name);

        // then
        expect(apiCall).toHaveBeenCalledWith(config.url, name());
        expect(result).toEqual({ name: name(), status: true });
    });

    it('should return object with name and status when name is function and apiCall returns false', async () => {
        // having
        const name = () => 'Lee';
        apiCall.mockResolvedValue(false);

        // when
        const result = await dataGenerator(name);

        // then
        expect(apiCall).toHaveBeenCalledWith(config.url, name());
        expect(result).toEqual({ name: name(), status: false });
    });

    it('should return null when name is numer', async () => {
        // having
        const name = 123;

        // when
        const result = await dataGenerator(name);

        // then
        expect(apiCall).not.toHaveBeenCalled();
        expect(result).toEqual(null);
    });

    it('should return null when name is undefined', async () => {
        // when
        const result = await dataGenerator();

        // then
        expect(apiCall).not.toHaveBeenCalled();
        expect(result).toEqual(null);
    });
})