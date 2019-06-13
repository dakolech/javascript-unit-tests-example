import { dataGenerator } from './dataGenerator';
import { apiCall } from './api';
import { config } from './config';

jest.mock('./api');

describe('dataGenerator', () => {
    describe('when name parameter is string', () => {
        const name = 'Bruce';

        describe('and apiCall returns true', () => {
            let result;

            beforeAll(async () => {
                apiCall.mockResolvedValue(true);

                result = await dataGenerator(name);
            });

            afterAll(() => {
                apiCall.mockReset();
            });

            it('should return object with name and status', () => {
                expect(result).toEqual({ name, status: true });
            });

            it('should call apiCall with an URL from config', () => {
                expect(apiCall).toHaveBeenCalledWith(config.url, name);
            });
        });

        describe('and apiCall returns false', () => {
            let result;

            beforeAll(async () => {
                apiCall.mockResolvedValue(false);

                result = await dataGenerator(name);
            });

            afterAll(() => {
                apiCall.mockReset();
            });

            it('should return object with name and status', () => {
                expect(result).toEqual({ status: false });
            });

            it('should call apiCall with an URL from config', () => {
                expect(apiCall).toHaveBeenCalledWith(config.url, name);
            });
        });
    });

    describe('when name parameter is function', () => {
        const name = () => 'Lee';

        describe('and apiCall returns true', () => {
            let result;

            beforeAll(async () => {
                apiCall.mockResolvedValue(true);

                result = await dataGenerator(name);
            });

            afterAll(() => {
                apiCall.mockReset();
            });

            it('should return object with name returned from function and status', () => {
                expect(result).toEqual({ name: name(), status: true });
            });

            it('should call apiCall with an URL from config', () => {
                expect(apiCall).toHaveBeenCalledWith(config.url, name());
            });
        });

        describe('and apiCall returns false', () => {
            let result;

            beforeAll(async () => {
                apiCall.mockResolvedValue(false);

                result = await dataGenerator(name);
            });

            afterAll(() => {
                apiCall.mockReset();
            });

            it('should return object with name returned from function and status', () => {
                expect(result).toEqual({ name: name(), status: false });
            });

            it('should call apiCall with an URL from config', () => {
                expect(apiCall).toHaveBeenCalledWith(config.url, name());
            });
        });
    });

    describe('when name parameter is number', () => {
        let result;
        const param = 123;

        beforeAll(async () => {
            result = await dataGenerator(param);
        });

        it('should return null', () => {
            expect(result).toEqual(null);
        });

        it('should not call apiCall', () => {
            expect(apiCall).not.toHaveBeenCalled();
        });
    });

    describe('when name parameter is undefined', () => {
        let result;

        beforeAll(async () => {
            result = await dataGenerator();
        });

        it('should return null', () => {
            expect(result).toEqual(null);
        });

        it('should not call apiCall', () => {
            expect(apiCall).not.toHaveBeenCalled();
        });
    });
})