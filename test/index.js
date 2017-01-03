'use strict'

const fs = require('fs-extra');
const path = require('path');
const expect = require('chai').expect;
const builder = require('../index');
const tmplFolder = path.join(__dirname, 'tmpl')


describe('fs-builder', () => {

	describe('createFs', () => {

		beforeEach(() => {
			fs.emptyDirSync(tmplFolder)
		})

		it('Должен создавать пустую директорию если значение пустой объект', () => {
			builder.createFs({root: {}}, tmplFolder)

			expect(fs.existsSync(path.join(tmplFolder, 'root'))).to.be.true
		})

		it('Если значение строка то должен создавать файл с именем равным имени свойства и содержанием равным значению', () => {
			builder.createFs({'root.js': 'value'}, tmplFolder);

			expect(fs.existsSync(path.join(tmplFolder, 'root.js'))).to.be.true;
			expect(fs.readFileSync(path.join(tmplFolder, 'root.js'), 'utf-8')).to.be.equal('value');
		})

		it('Если значение - объект, должен создать директорию с именем равным свойству и содержимым указанным в объекте', () => {
			builder.createFs({root: { 'file.js': 'value' }}, tmplFolder);

			expect(fs.existsSync(path.join(tmplFolder, 'root'))).to.be.true;
			expect(fs.existsSync(path.join(tmplFolder, 'root', 'file.js'))).to.be.true;
			expect(fs.readFileSync(path.join(tmplFolder, 'root', 'file.js'), 'utf-8')).to.be.equal('value');
		})
		
		it('Если несколько объектов вложенные, то создает вложенную структуру папок', () => {
			builder.createFs({ dir1: { dir2: { dir3 : {} } } }, tmplFolder);

			expect(fs.existsSync(path.join(tmplFolder, 'dir1'))).to.be.true;
			expect(fs.existsSync(path.join(tmplFolder, 'dir1', 'dir2'))).to.be.true;
			expect(fs.existsSync(path.join(tmplFolder, 'dir1', 'dir2', 'dir3'))).to.be.true;
		})

		it('Если значение не объект и не строка должен бросить исключение', () => {
			[5, [], null, () => {}].forEach(val => {
				expect(() => { builder.createFs({ root: val }, tmplFolder) }).to.throw(Error, /prop in tree must be an object or a string/);
			})
		})

	})

	describe('removeFs', () => {
		beforeEach(() => {
			fs.emptyDirSync(tmplFolder);
			builder.createFs({ dir1: { dir2: { dir3 : { 'file.js': ''} } } }, tmplFolder);
		})

		it('Должен удалять все переданное дерево со всем содержимым', () => {
			builder.removeFs({ dir1: { dir2: { dir3 : { 'file.js': ''} } } }, tmplFolder);
		})

		it('Должен удалять указанную директорию со всем содержимым', () => {
			builder.removeFs({ dir1: {} }, tmplFolder);
		})
	})

	after(() => {
		fs.removeSync(tmplFolder)
	})
	
})