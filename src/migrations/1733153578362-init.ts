import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1733153578362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        hash VARCHAR(255),
        role VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await queryRunner.query(`
      CREATE TABLE courses (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        description VARCHAR(255),
        starts_at TIMESTAMP,
        ends_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await queryRunner.query(`
      CREATE TABLE course_prices (
        id VARCHAR(255) PRIMARY KEY,
        course_id VARCHAR(255),
        currency VARCHAR(255),
        amount VARCHAR(255),
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE course_participants (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255),
        course_id VARCHAR(255),
        paid NUMERIC,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE course_reviews (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255),
        course_id VARCHAR(255),
        comment VARCHAR(255),
        points NUMERIC,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE newsletter_subscriptions (
        email VARCHAR(255) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await queryRunner.query(`
      CREATE TABLE newsletter_subscription_discounts (
        email VARCHAR(255),
        course_id VARCHAR(255),
        discount_percentage NUMERIC,
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (email, course_id),
        FOREIGN KEY (email) REFERENCES newsletter_subscriptions(email) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE IF EXISTS newsletter_subscription_discounts;`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS newsletter_subscriptions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS course_reviews;`);
    await queryRunner.query(`DROP TABLE IF EXISTS course_participants;`);
    await queryRunner.query(`DROP TABLE IF EXISTS course_prices;`);
    await queryRunner.query(`DROP TABLE IF EXISTS courses;`);
    await queryRunner.query(`DROP TABLE IF EXISTS users;`);
  }
}
