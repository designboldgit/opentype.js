// The `head` table contains global information about the font.
// https://www.microsoft.com/typography/OTSPEC/head.htm

'use strict';

var check = require('../check');
var parse = require('../parse');
var table = require('../table');

// Parse the header `head` table
function parseHeadTable(data, start) {
    var head = {},
        p = new parse.Parser(data, start);
    head.version = p.parseVersion();
    head.fontRevision = Math.round(p.parseFixed() * 1000) / 1000;
    head.checkSumAdjustment = p.parseULong();
    head.magicNumber = p.parseULong();
    check.argument(head.magicNumber === 0x5F0F3CF5, 'Font header has wrong magic number.');
    head.flags = p.parseUShort();
    head.unitsPerEm = p.parseUShort();
    head.created = p.parseLongDateTime();
    head.modified = p.parseLongDateTime();
    head.xMin = p.parseShort();
    head.yMin = p.parseShort();
    head.xMax = p.parseShort();
    head.yMax = p.parseShort();
    head.macStyle = p.parseUShort();
    head.lowestRecPPEM = p.parseUShort();
    head.fontDirectionHint = p.parseShort();
    head.indexToLocFormat = p.parseShort();     // 50
    head.glyphDataFormat = p.parseShort();
    return head;
}

function HeadTable() {
}

HeadTable.prototype = new table.Table('head', [
    {name: 'version', type: 'FIXED', value: 0x00010000},
    {name: 'fontRevision', type: 'FIXED', value: 0x00010000},
    {name: 'checkSumAdjustment', type: 'ULONG', value: 0},
    {name: 'magicNumber', type: 'ULONG', value: 0x5F0F3CF5},
    {name: 'flags', type: 'USHORT', value: 0},
    {name: 'unitsPerEm', type: 'USHORT', value: 1000},
    {name: 'created', type: 'LONGDATETIME', value: 0},
    {name: 'modified', type: 'LONGDATETIME', value: 0},
    {name: 'xMin', type: 'SHORT', value: 0},
    {name: 'yMin', type: 'SHORT', value: 0},
    {name: 'xMax', type: 'SHORT', value: 0},
    {name: 'yMax', type: 'SHORT', value: 0},
    {name: 'macStyle', type: 'USHORT', value: 0},
    {name: 'lowestRecPPEM', type: 'USHORT', value: 0},
    {name: 'fontDirectionHint', type: 'SHORT', value: 2},
    {name: 'indexToLocFormat', type: 'SHORT', value: 0},
    {name: 'glyphDataFormat', type: 'SHORT', value: 0}
]);

exports.parse = parseHeadTable;
exports.Table = HeadTable;
