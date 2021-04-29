const fs = require('fs/promises');
const path = require('path');

class DbFileManager {
    constructor(pathToDir, ...entities) {
        this.pathToDir = pathToDir;
        this.entities = entities;
    }

    checkDirExist() {
        return fs.access(this.pathToDir)
            .then( () => true)
            .catch( () => false);
    }

    checkFileExist(file) {
        const filename = file + '.json';
        const pathToFile = path.resolve(this.pathToDir, filename);
        return fs.access(pathToFile)
            .then( () => true)
            .catch( () => false);
    }

    async createDir() {
        const created = await this.checkDirExist();
        if(!created) {
            return fs.mkdir(this.pathToDir);
        }
        console.log('Directory is already exist');
    }

    async createFile(file) {
        const created = await this.checkFileExist(file);
        if(!created) {
            const filename = file + '.json';
            const pathToFile = path.resolve(this.pathToDir, filename);
            return fs.writeFile(pathToFile, '[]');
        }
    }

    async init() {
        await this.createDir();
        const allFileNames = this.entities.map( entity => {
            return entity.getName()
        });
        for(let file of allFileNames) {
            await this.createFile(file);
        }
    }

    async getAll(file) {
        const created = await this.checkFileExist(file);
        const filename = file + '.json';
        const pathToFile = path.resolve(this.pathToDir, filename);
        console.log(pathToFile);
        if(!created) {
            console.log('File doesnt exist');
            return null;
        }
        return fs.readFile(pathToFile)
            .then( data => {
                return JSON.parse(data);
            });
    }

    async createEntity(file, entity) {
        const filename = file + '.json';
        const pathToFile = path.resolve(this.pathToDir, filename);
        await this.createDir()
            .catch( () => console.log('Can not create directory'));
        await this.createFile(file)
            .catch( () => console.log('Can not create file'));
        const entityArray = await this.getAll(file);
        entityArray.push(entity);
        return fs.writeFile(pathToFile, JSON.stringify(entityArray));
    }

    async getEntity(file, id) {
        const entityArray = await this.getAll(file);
        return entityArray.find( entity => {
            return entity.id === id;
        })
    }

    async updateEntity(file, id, dataForUpdate) {
        const filename = file + '.json';
        const pathToFile = path.resolve(this.pathToDir, filename);
        const created = await this.checkFileExist(file);
        if(!created) {
            console.log('File doesnt exist');
            return null;
        }
        const entityArray = await this.getAll(file);
        const updatedEntityArray = entityArray.map( entity => {
            if(entity.id === id) {
                return Object.assign(entity, dataForUpdate);
            } else {
                return entity;
            }
        });
        return fs.writeFile(pathToFile, JSON.stringify(updatedEntityArray)).then( () => updatedEntityArray);
    }

    async deleteEntity(file, id) {
        const filename = file + '.json';
        const pathToFile = path.resolve(this.pathToDir, filename);
        const created = await this.checkFileExist(file);
        if(!created) {
            console.log('File doesnt exist');
            return null;
        }
        const entityArray = await this.getAll(file);
        const updatedEntityArray = entityArray.filter( entity => {
            return entity.id !== id;
        });
        return fs.writeFile(pathToFile, JSON.stringify(updatedEntityArray)).then( () => updatedEntityArray);

    }
}

module.exports = DbFileManager;