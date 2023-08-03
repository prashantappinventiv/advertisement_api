import {  Sequelize } from "sequelize";
import Category from "../model/category_model";
import { sequelize } from "../db_connection/db";
const {QueryTypes}=require('sequelize')

export class getCategory{
    static async get(req:any,res:any){
        try{
            console.log("insid try");
            
            const recursiveQuery=`
            WITH RECURSIVE category_recursive as(
                SELECT id,name,parent_id from "Categories"
                  WHERE parent_id IS NULL

                UNION ALL

                SELECT c.id,c.name,c.parent_id 
                FROM "Categories" c
                INNER JOIN category_recursive cr ON c.parent_id=cr.id
            
                )
                SELECT * 
                FROM category_recursive
                `;
                console.log("after query");
                
            const categoryWithsubCategory=await sequelize.query(recursiveQuery,{
                type:QueryTypes.select,
                
            })
            res.status(200).json(categoryWithsubCategory);
    
        }
    
    catch(error){
        
return res.status(500).send("invalid data")
    }
}


}
export class filter{

    static  async filterCategory(req:any,res:any)
      {
          try{
              const {name}=req.body;
              const filter=`select * from "Products"  where "Products"."category_id" in (
                WITH RECURSIVE "last_category" AS (
                            SELECT "c"."id", "c"."name"
                            FROM "Categories" "c"
                            WHERE "name" = '${name}'
                          
                            UNION ALL
                          
                            SELECT "c2"."id", "c2"."name"
                            FROM "Categories" "c2"
                            INNER JOIN "last_category" "lc" ON "c2".parent_id  = "lc"."id"
                            WHERE "c2"."parent_id"  IS NOT NULL 
                            )
                          select "id"
                          FROM "last_category")`;
                            const filterCategory=await sequelize.query(filter,{
                                type:QueryTypes.select,              
          })
          res.status(200).josn(filterCategory)
        }
          catch(error){
              return res.status(500).send(error)
          }
      }
       
  }

