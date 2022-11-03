import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Items, ItemsDocument } from './schema/items.schema';

@Injectable()
export class ItemsService {

  constructor(@InjectModel(Items.name) private itemsModule: Model<ItemsDocument>) { }

  async create(createItemDto: CreateItemDto) {
    const itemCreated = await this.itemsModule.create(createItemDto)
    return itemCreated
  }

  async findAll() {
    const items = await this.itemsModule.find();
    return items
  }

  async findOne(id: string) {
    const item = await this.itemsModule.findById(id);
    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(id: string) {
    const item = await this.itemsModule.findByIdAndDelete(id)
    return item
  }
}
