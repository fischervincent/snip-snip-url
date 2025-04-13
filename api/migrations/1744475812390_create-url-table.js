export const up = (pgm) => {
  pgm.createTable('urls', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    slug: {
      type: 'varchar(16)',
      notNull: true,
      unique: true, // Ensures no two rows can have the same slug
    },
    url: {
      type: 'text',
      notNull: true,
    },
    expire_at: {
      type: 'timestamp',
      notNull: false,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
    click_count: {
      type: 'integer',
      default: 0,
      notNull: true,
    }
  });
};

export const down = (pgm) => {
  pgm.dropTable('urls');
};
