import { Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Visit } from "./Visit";

@ObjectType()
@Entity()
export class Clinic extends BaseEntity{

  @Field(()=>ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column("text")
  name!: string
  
  @Field()
  @Column("text")
  location!: string

  @OneToMany(() => Visit, visit => visit.clinic)
  visits!: Visit[]
  
}

@Resolver()
export class ClinicsResolver {
  
  @Query(()=>[Clinic])
  async clinics(){
    return Clinic.find();
  }
  @Mutation(()=>Clinic)
  async createClinic(
      @Arg('name') name: string, 
      @Arg('location') location: string
    ){
      return Clinic.create({name, location}).save()
  }
}
