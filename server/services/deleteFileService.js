import fsPromises from "fs/promises";

const deleteFileService = async (filePath) => {
    try {
        await fsPromises.unlink(filePath);
        console.log(`Файл ${filePath} удален.`);
    } catch (error) {
        console.error(
            `Произошла ошибка при попытке удалить файл: ${error.message}`
        );
    }
};

export default deleteFileService;
