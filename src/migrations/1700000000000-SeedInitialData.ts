import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1700000000000 implements MigrationInterface {
  name = 'SeedInitialData1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Seed subscription plans
    await queryRunner.query(`
      INSERT INTO "subscription_plan" ("id", "plan_type", "name", "monthly_price", "yearly_price", "description", "max_points_of_sale", "max_users", "ai_queries_per_month", "has_advanced_analytics", "has_api_access", "has_white_label", "has_custom_integrations", "has_priority_support", "has_phone_support", "has_predictive_analytics", "is_active")
      VALUES
        (gen_random_uuid(), 'starter', 'Starter', 0, 0, 'Para negocios pequeños que inician', 1, 3, 100, false, false, false, false, false, false, false, true),
        (gen_random_uuid(), 'professional', 'Professional', 29.99, 299.99, 'Para negocios en crecimiento', 3, 10, 1000, true, true, false, false, true, false, false, true),
        (gen_random_uuid(), 'enterprise', 'Enterprise', 99.99, 999.99, 'Para empresas con necesidades avanzadas', -1, -1, -1, true, true, true, true, true, true, true, true)
    `);

    // Seed payment methods
    await queryRunner.query(`
      INSERT INTO "payments_method" ("method_name")
      VALUES ('Efectivo'), ('Tarjeta de Débito'), ('Tarjeta de Crédito'), ('Transferencia'), ('Otro')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "subscription_plan"`);
    await queryRunner.query(`DELETE FROM "payments_method"`);
  }
}
